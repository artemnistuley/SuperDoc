import { getExtensionConfigField } from './helpers/getExtensionConfigField.js';
import { callOrGet } from './utilities/callOrGet.js';

/**
 * Extension class is used to create extensions.
 */
export class Extension {
  type = 'extension';

  name = 'extension';

  options;

  storage;

  config = {
    name: this.name,
  };

  constructor(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    this.name = this.config.name;

    if (this.config.addOptions) {
      this.options = callOrGet(
        getExtensionConfigField(this, 'addOptions', {
          name: this.name,
        }),
      );
    }

    this.storage =
      callOrGet(
        getExtensionConfigField(this, 'addStorage', {
          name: this.name,
          options: this.options,
        }),
      ) || {};
  }

  /**
   * Static method for creating an extension.
   * @param args Arguments for the constructor.
   */
  static create(...args) {
    return new Extension(...args);
  }
}
