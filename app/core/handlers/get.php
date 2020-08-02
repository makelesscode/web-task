<?php

function handle_get() {
    $meta = get_audios_meta();

    foreach ($meta as &$entry) {
        $entry['src'] = UPLOADS_PUBLIC_PATH . '/' . $entry['filename'];
        unset($entry['filename']);
    }

    return $meta;
}