import {fillTheArray} from './data.js';
import {createMiniatures} from './miniatures.js';
import {getData, sendData} from './api.js';
import {closeImgEditor ,onFormSubmit, showFullErrorMessage, showFullSuccessMessage} from './form.js';
import {showAlert} from './util.js';
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
} catch (err) {
  showAlert(err.message);
}
