import React from 'react'
import { Card } from 'semantic-ui-react'

const CategoryList = ({ categories }) => {
  if (!categories.length) {
    <h3>Can't find any articles!</h3>
  }

  return (
    categories.map((categories) => (
  <Card key={categories._id}
    href='#card-example-link-card'
    header={categories.name}
    meta='Friend'
    description={categories.description}
  />
  )))
}

export default CategoryList