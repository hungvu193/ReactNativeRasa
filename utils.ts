import { v4 as uuidv4 } from 'uuid';
import {
  IMessage,
  User,
  QuickReplies
} from 'react-native-gifted-chat';
import { IRasaResponse } from './types';
/**
 * Random id for each message
 */
export { uuidv4 };

/**
 * Return a message after format
 * @param {Object} botMessageObj
 * @param {Object} botData
 */

// To do add compatibility for checkboxes (It will need create a custom schema similar tu slack)
export const createNewBotMessage = (botMessageObj: IRasaResponse, botData: User): IMessage => {
  const {
    attachment,
    buttons,
    text = '',
    image = ''
  } = botMessageObj;
  let quickReplies = {
    type: 'radio',
    keepIt: false,
    values: []
  } as QuickReplies;

  // 
  if (isValidNotEmptyArray(buttons)) {
    quickReplies.values = buttons?.map((button) => ({
      title: button.title,
      value: button.payload,
    }))
  } else {
    if (attachment) {
      quickReplies.type = attachment?.payload?.template_type ?? 'radio';
      quickReplies.values = attachment?.payload?.buttons?.map((button) => ({
        title: button.title,
        value: button.payload,
      })) ?? []
    }
  }

  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: botData,
    text,
    image,
    quickReplies
  };
}

/**
 * Receives a string and botData and returns an empty bot message
 * @param {string} emptyMessage
 * @param {Object} botData
 */
export const createBotEmptyMessage = (emptyMessage: string, botData: User): IMessage => {
  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: botData,
    text: emptyMessage,
  };
}

/**
 * Receive a string, userData and return user message
 * @param {string} text
 * @param {Object} userData
 */
export const createQuickUserReply = (text: string, userData: User): IMessage => {
  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: userData,
    text,
  };
}

export const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Receive an array and Returs true if is a valid array and its is not empty otherwise it returns false
 * @param {array} array
 */
export const isValidNotEmptyArray = (array: any[]): boolean => {
  return !!(array && array?.length && array?.length > 0)
};