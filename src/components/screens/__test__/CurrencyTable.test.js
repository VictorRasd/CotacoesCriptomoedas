import React from 'react'
import ReactDOM from 'react-dom'
import CurrencyTable from '../CurrencyTable.tsx'
import renderer from 'react-test-renderer'
import "@testing-library/jest-dom/extend-expect"

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CurrencyTable></CurrencyTable>, div);
})

it("matches snapshot", () => {
    const tree = renderer.create(<CurrencyTable></CurrencyTable>).toJSON();
    expect(tree).toMatchSnapshot()
})

