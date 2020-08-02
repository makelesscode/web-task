<?php

function handle_put() {
    // Path should be something like /api/audios/[hash]. Let's parse it
    $path = get_path_segments($_SERVER['REQUEST_URI'], $segments_to_omit = 0);
    if (!isset($path[2])) {
        display_api_error(0, 'Cannot perform operations without knowing the file hash.');
    }

    $file_hash = $path[2];
    // Look for the actual file. If it doesn't exist, display error
    $allowed_exts = ['mp3', 'wav'];
    $filename = null;
    foreach ($allowed_exts as $ext) {
        if (is_file(UPLOADS_SERVER_PATH . "{$file_hash}.{$ext}")) {
            $filename = "{$file_hash}.{$ext}";
            break;
        }
    }

    if ($filename === null) { // filename is still null, therefore no file found.
        display_api_error(404, 'File not found', 404);
    }

    $req_payload = retrieve_webdav_json();

    $stored_entry = get_validated_entry($req_payload);

    // Save entry to the database

    $data = get_audios_meta();

    $entry_exists = false;
    foreach ($data as &$entry) {
        if ($entry['hash'] === $file_hash) {
            // If existing entry found, replace it
            $entry = $stored_entry;
            $entry_exists = true;
            break;
        }
    }

    if (!$entry_exists) {
        // If entry does not exist, put a new one to the beginning of the dataset
        array_unshift($data, $entry);
    }

    update_dataset($data);

}

function get_validated_entry($req_payload) {
    $required_fields = [
        'title',
        'artist',
        'duration',
    ];

    foreach ($required_fields as $field) {
        if (!isset($req_payload[$field])) {
            display_api_error(400, "Required field '{$field}' is missing.");
        }
    }

    $stored_entry = [
        'filename' => $filename,
        'hash' => $file_hash
    ];

    // Following code is repeated a few times with little differences, but outside of this place it is not used,
    // so creating function for validating and sanitization is considered redundant.
    // If validation is a big issue, some library may be used.

    // Validate artist
    if (!is_string($req_payload['artist']) || strlen($req_payload['artist']) > 50) {
        display_api_error(400, 'Invalid value for \'artist\' field.');
    }

    $stored_entry['artist'] = htmlspecialchars($req_payload['artist']);

    // Validate title
    if (!is_string($req_payload['title']) || strlen($req_payload['title']) > 50) {
        display_api_error(400, 'Invalid value for \'title\' field.');
    }

    $stored_entry['title'] = htmlspecialchars($req_payload['title']);

    // Validate duration
    if (!is_int($req_payload['duration']) || $req_payload['duration'] < 0) {
        display_api_error(400, 'Invalid value for \'duration\' field.');
    }

    $stored_entry['duration'] = $req_payload['duration'];
    
    // Validate album_name
    if (
        isset($req_payload['album_name'])
        && is_string($req_payload['album_name'])
        && strlen($req_payload['album_name']) > 0
    ) {
        if (strlen($req_payload['album_name']) > 50) {
            display_api_error(413, '\'album_name\' is too large.', 413);
        }

        $stored_entry['album_name'] = htmlspecialchars($req_payload['album_name']);
    }

    // Validate release_year
    if (
        isset($req_payload['release_year'])
        && is_int($req_payload['release_year'])
        && strlen($req_payload['album_name']) > 0
    ) {
        if ($req_payload['release_year'] < 0 || $req_payload['release_year'] > date('Y')) {
            display_api_error(400, '\'release_year\' must be correct year.');
        }

        $stored_entry['release_year'] = $req_payload['release_year'];
    }
}