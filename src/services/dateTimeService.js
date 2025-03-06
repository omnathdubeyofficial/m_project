/**
 * @author 
 */

import moment from 'moment';

const sysdate_yyyymmdd = () => moment().format("YYYYMMDD");
const systime_hh24mmss = () => moment().format("HHmmss");

const setUserDate = () => sysdate_yyyymmdd();
const setUserTime = () => systime_hh24mmss();

const unique_id = (first_name) => {
  const id = `${first_name.toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 100000)}${first_name.toUpperCase().slice(first_name.length - 1, first_name.length)}`

  return id;
}
// Export
export {
  sysdate_yyyymmdd,
  systime_hh24mmss,
  setUserDate,
  setUserTime,
  unique_id
};