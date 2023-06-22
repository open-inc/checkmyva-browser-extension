export const STORE_GOOGLE_TAKEOUT = {
  KEY: "google-takeout",
  DEFAULT: {
    takeoutVoiceLines: [],
  },
};

export const STORE_ALEXA_TAKEOUT = {
  KEY: "alexa-takeout",
  DEFAULT: {
    takeoutVoiceLines: [],
  },
};

export const STORE_ALEXA_CRAWLER_CONFIG = {
  KEY: "alexa-history-config",
  DEFAULT: {
    crawlerConfigEnabled: false,
  },
};

export const STORE_ALEXA_CRAWLER_HISTORY = {
  KEY: "alexa-history",
  DEFAULT: {
    requests: [],
    history: [],
  },
};

export async function loadStorage({ KEY, DEFAULT }) {
  return new Promise((resolve) => {
    chrome.storage.local.get([KEY], function(result) {
      if (result[KEY]) {
        resolve(result[KEY]);
      } else {
        resolve(DEFAULT);
      }
    });
  });
}

export async function saveStorage({ KEY }, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [KEY]: value }, function() {
      resolve();
    });
  });
}

export function onStorageChange(key, callback) {
  function listener(object, namespace) {
    if (namespace === "local" && object[key]) {
      callback(object[key].newValue);
    }
  }

  chrome.storage.onChanged.addListener(listener);

  return () => {
    chrome.storage.onChanged.removeListener(listener);
  };
}

export async function resetStorage({ KEY, DEFAULT }) {
  await saveStorage({ KEY }, DEFAULT);
}

export function subscribeStorage(obj, { KEY, DEFAULT }) {
  Object.assign(obj, DEFAULT);

  loadStorage({ KEY, DEFAULT }).then((value) => {
    console.log("storage load", KEY, value);

    Object.assign(obj, value);
  });

  onStorageChange(KEY, (value) => {
    console.log("storage change", value);
    if (value) Object.assign(obj, value);
  });
}
