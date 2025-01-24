/**
 * @author 
 */

import moment from 'moment';

const sysdate_yyyymmdd = () => moment().format("YYYYMMDD");
const systime_hh24mmss = () => moment().format("HHmmss");

const setUserDate = () => sysdate_yyyymmdd();
const setUserTime = () => systime_hh24mmss();

// Export
export {
  sysdate_yyyymmdd,
  systime_hh24mmss,
  setUserDate,
  setUserTime
};