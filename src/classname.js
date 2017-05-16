const getClassName = name => !Number.isNaN(parseInt(name, 10)) ? `n${name}` : name

module.exports = { getClassName }
