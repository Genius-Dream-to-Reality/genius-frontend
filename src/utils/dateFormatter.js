import dayjs from "dayjs";

export const formatDayjsToApiDateTime = (dayjsObj) => {
    if (!dayjsObj || !dayjsObj.isValid()) {
        throw new Error('Invalid Day.js object provided');
    }

    return dayjsObj.format('YYYY-MM-DDTHH:mm:ss');
};

export const formatTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

export const generateDateTimeStrings = (eventDate, time) => {
    // eventDate: "2025-12-30"
    // startTime & endTime: "HH:mm" format, e.g., "15:30", "17:30"

    // Combine date and time using dayjs
    const dateTime = dayjs(`${eventDate}T${time}:00`).format('YYYY-MM-DDTHH:mm:ss');

    return dateTime;
}