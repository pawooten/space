export const playFieldConfig = {
  width: 540,
  height: 960,
  cellWidth: 10,
  get fieldCellWidth(): number {
    return this.width / this.cellWidth;
  },
  get fieldCellHeight(): number {
    return this.height / this.cellWidth;
  }
};

export const starshipConfig = {
  width: 64,
  height: 64,
  imageHeight: 512,
  imageWidth: 512,
  imageSource: '../../assets/svg/starship.svg'
};
