/**
 * JulCzar javascript framework
 * Made by Júlio César Barcelo Monteiro
 * created: 12/19/2018
 * Last Edit: 05/12/2019
 */

export const d  = document
const LS = localStorage
const SS = sessionStorage

export const get = {
  /**
   * Find an Id in the DOM
   * @param {String} item Id you want to be located in the DOM
   */
  Id (elementId) {
    return d.getElementById(elementId)
  },
  /**
   * Find, in the DOM, all Classes that match
   * @param {String} item Classes you want to locate in the DOM
   */
  Classes (classesName) {
    return d.getElementsByClassName(classesName)
  },
  /**
   * Find the first element that match with the query specified
   * @param {String} elemQuery Query you want to locate
   */
  Query (elemQuery) {
    return d.querySelector(elemQuery)
  },
  /**
   * Find all elements that match with the query specified
   * @param {String} elemQuery Query you want to locate
   */
  Queries (elemQuery) {
    return d.querySelectorAll(elemQuery)
  },
  /**
   * Gives you the current time in miliseconds
   */
  Date () {
    return new Date().getTime()
  },
  /**
   * Find in the SS the key requested and return the value parsed
   * @param {String} key
   * @returns {JSON}
   */
  Session (key) {
    const value = SS.getItem(key)
    return JSON.parse(value)
  },
  /**
   * Find in the LocalStorage the key requested and return the value parsed
   * @param {String} key
   * @returns {JSON}
   */
  Local (key) {
    const value = LS.getItem(key)
    return JSON.parse(value)
  },
  /**
   * Locate all the queries in the URL and return it as an Object.
   */
  UrlData () {
    const urlParams = new URLSearchParams(location.search)
    const result = {}
    for (const key of urlParams.keys()) {
      result[key] = urlParams.get(key)
    }
    return result
  }
}

export const set = {
  /**
   * Save in the LocalStorage any value you want to
   * @param {String} key Key where the data will be stored
   * @param {*} data data to be stored
   */
  Local (key, data) {
    const value = JSON.stringify(data)
    LS.setItem(key, value)
  },
  /**
   * Save in the SS any data
   * @param {String} key Key where the data will be stored
   * @param {*} data data to be stored
   */
  Session (key, data) {
    const value = JSON.stringify(data)
    SS.setItem(key, value)
  }
}

export const del = {
  /**
   * Delete from LocalStorage a key
   * @param {String} key Key to be deleted
   */
  fromLocal (key) {
    LS.removeItem(key)
  },
  /**
   * Delete from SS a key
   * @param {String} key
   */
  fromSession (key) {
    SS.removeItem(key)
  },
  /**
   * Remove from the DOM an element
   * @param {HTMLElement} elem
   */
  element (elem) {
    elem.remove()
  }
}

/**
 * Adds an event listener to a target in DOM
 * @param {String} event Event that will be listened
 * @param {Function} func Function that will be executed when the event is located
 * @param {HTMLElement} target Target. (default = document)
 */
export const listen = (event, func, target = d) => {
  target.addEventListener(event, func)
}

/**
 * Compare the length of a String with a specified value and return it truncated if (str.length > maxLength),
 * @param {String} str string you want to analize
 * @param {Number} maxLength pos you want to cut the string if it is higher than
 * @param {*} sufix will be added at the end of the truncated string
 * ( default = '...' )
 */
export const truncate = (str, maxLength, sufix = '...') => {
  if (str.length > maxLength)
    return str.substring(0, --maxLength) + sufix
  return str
}
