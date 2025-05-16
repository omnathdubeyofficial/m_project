/**
 * @author 
 */

// import { ThirdPartyDraggable } from '@fullcalendar/interaction/index.js';
// import { error } from 'console';
import moment from 'moment';

const sysdate_yyyymmdd = () => moment().format("YYYYMMDD");
const systime_hh24mmss = () => moment().format("HHmmss");

const setUserDate = () => sysdate_yyyymmdd();
const setUserTime = () => systime_hh24mmss();

const unique_id = (first_name) => {
  const id = `${first_name.toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 100000)}${first_name.toUpperCase().slice(first_name.length - 1, first_name.length)}`
  return id;

}


const setDateFormat = (date) => {
  if (!date || typeof date !== 'string') return "";

  const parts = date.split(/[^0-9]/);

  // Ensure we always get 3 parts
  if (parts.length !== 3) return "";

  const [part1, part2, part3] = parts;

  // Case 1: YYYY-MM-DD or YYYY/MM/DD
  if (part1.length === 4) {
    const formatMonth = part2.padStart(2, '0');
    const formatDay = part3.padStart(2, '0');
    return `${part1}${formatMonth}${formatDay}`; // return in YYYYMMDD
  }

  // Case 2: DD-MM-YYYY or DD/MM/YYYY
  if (part3.length === 4) {
    const formatDay = part1.padStart(2, '0');
    const formatMonth = part2.padStart(2, '0');
    return `${part3}${formatMonth}${formatDay}`; // return in YYYYMMDD
  }

  return "";
};

// const setDateFormat = (date) => {
//   // if (!date) return "";
//   if (date) {
//     const parts = date.split(/[^0-9]/);
//     // if (parts.length != 3) return "";

//     const [part1, part2, part3] = parts
//     if (part1.length === 4) {
//       const formatPart2 = part2.length === 1 ? `0${part2}` : part2
//       const formatPart3 = part3.length === 1 ? `0${part3}` : part3
//       return `${part1}${formatPart2}${formatPart3}`

//     }
//     if (part3.length === 4) {
//       const formatPart1 = part1.length === 1 ? `0${part1}` : part1
//       const formatPart2 = part2.length === 1 ? `0${part2}` : part2
//       return `${part3}${formatPart2}${formatPart1}`

//     }
//   }
// }

// Export
export {
  sysdate_yyyymmdd,
  systime_hh24mmss,
  setUserDate,
  setUserTime,
  unique_id,
  setDateFormat
};