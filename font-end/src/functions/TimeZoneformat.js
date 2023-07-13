function convert(str) {
    var date = new Date(str);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });

    var convertDate = new Date(formattedDate)

    return convertDate
}

module.exports = convert;