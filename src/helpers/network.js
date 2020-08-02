const LAST_FM_API_KEY = 'cb56569e3a7d3d88d0747b47a0d9469a';
const LAST_FM_API_URL = 'http://ws.audioscrobbler.com/2.0/';
const APP_API_URL = 'http://localhost/api/audios';

export async function retrieveRemoteJSON(url, data, method = 'GET') {
  const body = new FormData();

  Object.keys(data).forEach((prop) => {
    body.append(prop, data[prop]);
  });

  let response = null;
  const raw = await fetch(url, {
    method,
    body,
  });
  response = await raw.json();

  if (response.error) {
    throw new Error(response);
  }

  return response;
}

export function uploadToURL(url, originalData = {}, onUpdateProgress = null) {
  const data = { ...originalData };
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.response && xhr.response) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.response));
      }
    });
    xhr.addEventListener('error', () => { reject(new Error(xhr.statusText)); });
    xhr.addEventListener('abort', () => { reject(new Error(xhr.statusText)); });
    if (onUpdateProgress !== null) {
      xhr.upload.addEventListener('progress', onUpdateProgress);
    }
    const formData = new FormData();
    Object.keys(data).forEach((prop) => {
      formData.append(prop, data[prop]);
    });
    xhr.open('POST', url);
    xhr.send(formData);
  });
}

export function makeLastFmApiCall(method, data) {
  data.api_key = LAST_FM_API_KEY;
  data.format = 'json';
  data.method = method;
  return retrieveRemoteJSON(LAST_FM_API_URL, data);
}

export function getLastFmSimilarArtists(artist) {
  return makeLastFmApiCall('artist.getsimilar', { artist });
}

export function uploadAudio(file, onProgress) {
  return uploadToURL(
    APP_API_URL, {
      audio: file,
    },
    onProgress,
  );
}

export function getAudioListData() {
  return retrieveRemoteJSON(APP_API_URL);
}

export function updateAudioData(hash, data) {
  return retrieveRemoteJSON(`${APP_API_URL}/${hash}`, data, 'PUT');
}

export function deleteAudio(hash) {
  return retrieveRemoteJSON(`${APP_API_URL}/${hash}`, {}, 'DELETE');
}
