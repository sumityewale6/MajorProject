// utils/wrapAsync.js
const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = wrapAsync;

// module.exports = wrapAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };

// functions wrapAsync(fn){
//     return function(req, res, next){
//         fn(req,res,next).catch(next)
//     }
// }
