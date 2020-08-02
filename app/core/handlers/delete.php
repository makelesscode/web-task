<?php

function handle_delete() {
    // Path should be something like /api/audios/[hash]. Let's parse it
    $path = get_path_segments($_SERVER['REQUEST_URI'], $segments_to_omit = 0);
    if (!isset($path[2])) {
        display_api_error(0, 'Cannot perform operations without knowing the file hash.');
    }

    $file_hash = $path[2];

    // Delete entry from the dataset

    $data = get_audios_meta();
    $entry_key = null;
    foreach ($data as $entry_id => $entry) {
        if ($entry['hash'] === $file_hash) {
            // If existing entry found, get index and delete file itself and the entry
            unlink(UPLOADS_SERVER_PATH . "/{$entry['filename']}");
            $entry_key = $entry_id;
            break;
        }
    }

    if ($entry_key === null) {
        display_api_error(404, 'File not found', 404);
    }

    // Delete entry from the dataset and save it
    array_splice($data, $entry_key, 1);
    update_dataset($data);

    return ['success' => true];
}