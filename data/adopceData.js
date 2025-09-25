const adopce = [];

function ulozAdopci(novaZadost) {
  adopce.push(novaZadost);
}

function seznamAdopci() {
  return adopce;
}

module.exports = { ulozAdopci, seznamAdopci };
