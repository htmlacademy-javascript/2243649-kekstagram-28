import {fillTheArray} from './data.js';
import {createMiniatures} from './miniatures.js';
import {getData, sendData} from './api.js';
import {closeImgEditor ,onFormSubmit, showFullErrorMessage, showFullSuccessMessage} from './form.js';
import {showAlert} from './util.js';
import { getFiltersClassChange, getFiltersRender } from './sort-photos.js';

import './open-picture.js';
import './form.js';

createMiniatures(fillTheArray);

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeImgEditor();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  createMiniatures(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  getFiltersClassChange();
  getFiltersRender(data);
} catch (err) {
  showAlert(err.message);
}
