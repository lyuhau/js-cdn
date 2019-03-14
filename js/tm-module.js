var module = {
  set exports(module) {
    this.modules.push(module);
  },
  modules: []
};
