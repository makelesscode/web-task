<?php

function display_api_error($error_no, $error_descr, $http_response_code = 500) {
    http_response_code($http_response_code);

    echo json_encode([
        'code' => $error_no,
        'description' => $error_descr,
    ]);

    exit;
}

function get_path_segments($path, $segments_to_omit = 0) {
    $path = trim($path, '/');
    $path_segs = explode('/', $path);
    if ($segments_to_omit > 0) {
        array_splice($path_segs, 0, $segments_to_omit);
    }

    return $path_segs;
}

function retrieve_webdav_json() {
    $data = file_get_contents('php://input');
    try {
        return json_decode($data, true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        display_api_error(415, 'Unknown format, JSON expected.', 415);
    }
}

// approx. schema of the file: [{ hash, artist, title, duration, [release_year], [album_name] }, ...]
function &get_audios_meta() {
    static $_data = null;

    if ($_data === null) {
        if (is_file(DATASET_PATH)) {
            $data_text = file_get_contents(DATASET_PATH);
            $_data = json_decode($data_text, true);
            if ($_data === null) {
                $_data = [];
            }
            unset($data_text);
        } else {
            $_data = [];
            file_put_contents(DATASET_PATH, '[]'); // create empty array 
        }
    }

    return $_data;
}

function update_dataset($updated_dataset) {
    $json = json_encode($updated_dataset);
    file_put_contents(APP_ROOT . '/core/metadata.json', $json);
}