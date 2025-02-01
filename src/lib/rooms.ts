export const ROOM_CODES = {
    ww_arden: 7894,
    ww_bericote: 9269,
    ww_compton: 9271,
    ww_dunsmere: 9267,
    ww_emscote: 9268,
    ww_feldon: 7896,
    ww_gosford: 9270,
    ww_hampton: 9276,
    ww_kinghtcote: 9275,
    ww_loxley: 9273,
    av_1: 9274,
    av_2: 9272,
    av_3: 9354,
    bf_1: 7900,
    bf_2: 7901,
    bb_1: 7903,
    bb_2: 9373,
    bb_3: 7904,
    bb_4: 7905,
    cc_1: 7908,
    cc_2: 7895,
    cc_3: 9353,
    cryfield: 9351,
    hb_east: 7899,
    hb_west: 9352,
    int_house: 7902,
    jm_3: 7906,
    ls_1: 7897,
    ls_4: 7898,
    sb_1: 5982,
    sb_5: 5981,
    sb_7: 5983,
    tocil: 7907,
    rootes: 15288
};

export type Room = keyof typeof ROOM_CODES;

export const roomNames = {
    rootes: 'Rootes',
    tocil: 'Tocil',
    av_1: 'Arthur Vick 1',
    av_2: 'Arthur Vick 2',
    av_3: 'Arthur Vick 3',
    bf_1: 'Benefactors 1',
    bf_2: 'Benefactors 2',
    bb_1: 'Bluebell 1',
    bb_2: 'Bluebell 2',
    bb_3: 'Bluebell 3',
    bb_4: 'Bluebell 4',
    cc_1: 'Claycroft 1',
    cc_2: 'Claycroft 2',
    cc_3: 'Claycroft 3',
    cryfield: 'Cryfield',
    hb_east: 'Heronbank East',
    hb_west: 'Heronbank West',
    int_house: 'International House',
    jm_3: 'Jack Martin 3',
    ls_1: 'Lakeside 1',
    ls_4: 'Lakeside 4',
    sb_1: 'Sherbourne 1',
    sb_5: 'Sherbourne 5',
    sb_7: 'Sherbourne 7',
    ww_arden: 'Westwood Arden',
    ww_bericote: 'Westwood Bericote',
    ww_compton: 'Westwood Compton',
    ww_dunsmere: 'Westwood Dunsmere',
    ww_emscote: 'Westwood Emscote',
    ww_feldon: 'Westwood Feldon',
    ww_gosford: 'Westwood Gosford',
    ww_hampton: 'Westwood Hampton',
    ww_kinghtcote: 'Westwood Knightcote',
    ww_loxley: 'Westwood Loxley'
} satisfies Record<Room, string>;

export function validateRoom(room: string | string[] | null | undefined): Room {
    if (Array.isArray(room)) {
        for (const r of room) {
            if (r in ROOM_CODES) {
                return r as Room;
            }
        }
    } else if (room && room in ROOM_CODES) {
        return room as Room;
    }
    return 'rootes';
}
