import {BG_BLUE} from './palette';
import {dataGradius} from './stagesGradius';

const dataNPC = {
  previousLabel: '',
  npcX: 0,
};

export const stagesNPC = [
  {
    id: 1,
    nextID: 2,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 6,
      text: {2: 'npc1_1', 4: 'npc1_2', 6: 'npc1_3'},
      color: BG_BLUE,
    },
  },
  {
    id: 4,
    nextID: 5,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 4,
      text: {2: 'npc2_1', 4: 'npc2_2'},
      color: BG_BLUE,
    },
  },
  {
    id: 6,
    nextID: 7,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 4,
      text: {2: 'npc3_1', 4: 'npc3_2'},
      color: BG_BLUE,
    },
  },
  {
    id: 8,
    nextID: 9,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 6,
      text: {2: 'npc4_1', 4: 'npc4_2', 6: 'npc4_3'},
      color: BG_BLUE,
    },
  },
  {
    id: 11,
    nextID: 12,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 8,
      text: {2: 'npc5_1', 4: 'npc5_2', 6: 'npc5_3', 8: 'npc5_4'},
      color: BG_BLUE,
    },
  },
  {
    id: 13,
    nextID: 14,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 6,
      text: {2: 'npc6_1', 4: 'npc6_2', 6: 'npc6_3'},
      color: BG_BLUE,
    },
  },
  {
    id: 15,
    nextID: 16,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 8,
      text: {2: 'npc7_1', 4: 'npc7_2', 6: 'npc7_3', 8: 'npc7_4'},
      color: BG_BLUE,
    },
  },
  {
    id: 18,
    nextID: 19,
    type: 'NPC',
    data: {
      ...dataGradius,
      ...dataNPC,
      maxScore: 4,
      text: {2: 'npc8_1', 4: 'npc8_2'},
      color: BG_BLUE,
    },
  },
];
