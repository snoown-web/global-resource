const LOADING_MAP = [
  ['header', '/component/header.html'],
  ['footer', '/component/footer.html'],
];

const addDOMContentLoadedListener = (listener: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', listener);
  } else {
    listener();
  }
};

const load = () => {
  for (let i = 0; i < LOADING_MAP.length; i += 1) {
    const [tag, url] = LOADING_MAP[i];
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load shared elements in ${tag}`);
        return response.text();
      })
      .then((html) => {
        addDOMContentLoadedListener(() => {
          const element = document.getElementsByTagName(tag)[0];
          element.innerHTML = html;
        });
      })
      .catch((error) => console.error(error));
  }
};

load();
