import data from './data.json';

// Site-level content/configuration lives in data.json. Keep this tiny adapter
// so existing imports do not need to know the JSON shape.
export const REPO_URL = data.site?.repositoryUrl ?? '';
