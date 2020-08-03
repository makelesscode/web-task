<?php

function handle_post() {
    if (!isset($_FILES['audio'])) {
        display_api_error(0, 'No file found to upload.');
    }
    
    $audio = $_FILES['audio'];

    if ($audio['error'] !== UPLOAD_ERR_OK) {
        display_api_error($audio['error'], 'Error occurred while uploading.');
    }

    $allowed_exts = ['mp3', 'wav'];
    $file_ext = strtolower(end(explode('.', $audio['name'])));

    if (!in_array($file_ext, $allowed_exts)) {
        // 415 http response code is for 'media not supported'
        display_api_error(415, 'This file type is not supported.', 415); 
    }

    if ($audio['size'] > MAX_UPLOAD_SIZE) {
        // 413 http response code is for 'request entity too large'
        display_api_error(413, 'Uploaded file is too big.', 413);
    }

    $file_hash = md5_file($audio['tmp_name']);
    $uploaded_filename = "{$file_hash}.{$file_ext}";

    if (!move_uploaded_file(
        $audio['tmp_name'],
        UPLOADS_SERVER_PATH . "/{$uploaded_filename}"
    )) {
        display_api_error(); // by default displays 'Unknown error' with 400 Bad Request response code
    }

    return [
        'hash' => $file_hash
    ];

    
}