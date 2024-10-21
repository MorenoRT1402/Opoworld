const getBy = async (props, schema, populateObj, model) => {
  try {
    const data = await model.findOne(props)
    return data
  } catch (error) {
    throw new Error('Error fetching users')
  }
}

module.exports = { getBy }
