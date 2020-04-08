'use strict'

const stringValidator = require('./validators/string')
const priceValidator = require('./validators/price')
const Model = require('./model')

/**
 * Plain derivatives status message object used to instantiate model
 *
 * @typedef {object} StatusMessagesDerivData
 * @property {string} key - key
 * @property {number} timestamp - timestamp
 * @property {string} price - price
 * @property {string} priceSpot - spot price
 * @property {string} fundBal - funding balance
 * @property {string} fundingAccrued - accrued funding
 * @property {string} fundingStep - funding step
 */

/**
 * Derivatives Status Message model
 *
 * @extends Model
 */
class StatusMessagesDeriv extends Model {
  static FIELD_INDEX_MAPPING = {
    key: 0,
    timestamp: 1,
    price: 3,
    priceSpot: 4,
    fundBal: 6,
    fundingAccrued: 9,
    fundingStep: 10
  };

  /** @type {string} */
  key;

  /** @type {number} */
  timestamp;

  /** @type {string} */
  price;

  /** @type {string} */
  priceSpot;

  /** @type {string} */
  fundBal;

  /** @type {string} */
  fundingAccrued;

  /** @type {string} */
  fundingStep;

  /**
   * @param {StatusMessagesDerivData[]|StatusMessagesDerivData|Array[]|Array} data -
   *   derivatives status message data, one or multiple in object or array
   *   format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: StatusMessagesDeriv.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: StatusMessagesDeriv.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Validates a given public trade instance
   *
   * @param {object[]|object|StatusMessagesDeriv[]|StatusMessagesDeriv|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: StatusMessagesDeriv.FIELD_INDEX_MAPPING,
      validators: {
        key: stringValidator,
        timestamp: stringValidator,
        price: priceValidator,
        priceSpot: priceValidator,
        fundBal: priceValidator,
        fundingAccrued: priceValidator,
        fundingStep: priceValidator
      }
    })
  }
}

module.exports = StatusMessagesDeriv
