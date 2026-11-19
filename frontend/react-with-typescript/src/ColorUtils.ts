export const ColorUtils = {
  getColorList: function (size: number) {
    let list: string[] = [];
    for (let i = 0; i < size; i++) {
      let hue: number = Math.floor((360 / 7) * (i % 7));
      let saturation: number = 100 - Math.floor(i / 28) * 5;
      let brightness: number = 50 + Math.floor((i % 28) / 7) * 10;
      list.push(`hsl(${hue}, ${saturation}%, ${brightness}%)`);
    }
    return list;
  },
};
