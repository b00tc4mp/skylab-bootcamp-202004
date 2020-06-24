# GrowYourMoney

## Description
This small app allows you to oparte with exchange-traded derivatives like future and options whose underlying is an index or equity.
The following exchanges will be available:
- MEFF
- EUREX

The client must inform your account from which an initial guarantee will transfer (10% of the nomial).

In case of futures, the settlement of profit and losses will be made daily based on the evolution of the price of future. The settlement will be made automatically. The position will be closed automatically in the expiration date. The user can close her position carrying out the trade in the opposite direction and same price to the original trade.

The user can check your contracts and trades, asset allocation by sector, exchange and type of product.

The user can check your current and historic account balance.

![](https://media.giphy.com/media/l0HlDDyxBfSaPpU88/giphy.gif)

## Functional Description

### Use Cases

![use-cases](./images/use-cases.png)

### Activities

List products

![](./images/activity-diagram-list-products.png)

Show product details

![](./images/activity-show-product-details.png)

Search products

![](./images/activity-diagram-search-products.png)

Add user card

![](./images/activity-diagram-add-card.png)

## Technical description

### Blocks

![](./images/blocks.png)

### Modules/Components

![](./images/modules-components.png)

### Classes

![](./images/classes.png)

## Data Model

![dataModel](./images/data-model.png)

### Test Coverage

Client-side

![client-side](./images/client-side.png)

Server-side

![server-side](./images/server-side.png)

