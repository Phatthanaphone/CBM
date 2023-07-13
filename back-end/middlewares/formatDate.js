function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const newDate = [date.getFullYear(), mnth, day].join("-");
    hour = ("0" + date.getHours()).slice(-2),
    minute = ("0" + date.getMinutes()).slice(-2);
    let time = [hour, minute].join(":");
    return [newDate, time].join(" ")
  }
module.exports = convert;

