export function fmtTimeDuration(secs: number) {
    const date = new Date(0);
    date.setSeconds(secs);
 return date.toISOString().substring(11, 19);
}