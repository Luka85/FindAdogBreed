export const store = {
  state: {
    breedData: {},
  },
  setBreeds(breedsData) {
    this.state.breedData = breedsData;
  },
  getBreeds() {
    return this.state.breedData;
  },
};
