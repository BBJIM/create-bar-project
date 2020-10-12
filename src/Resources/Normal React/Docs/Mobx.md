# Mobx

This project can use Mobx library for global state(one source of truth)
management.
It use version 4, because of ie compatibility. when this project was written a
version 6 came out, consider useing that instead- its kind of the same thing
only the syntax is different, and maybe behind the scenes it works better.
for more information, see https:// mobx.js.org/README.html

-   Mobx is composed out from stores. store is a class that manage some
    state thats relevant to it, for example the ui store is responsible for
    the loading screen state(whether it should be on or off).

-   All of the BL(business logic) of the website should be in the mobx
    stores under the Logic folder, seprated to stores by the
    logic context(AuthStore, UiStore...)

(_a point to consider- should the modal store be a part of the ui store?
dose it depends on the size of the store?_)

-   Basic stores have class variables and methods that are- actions and
    computed(which is kind of like set and get of the variables).

-   The variables are actually the state which is observable and the
    actions are the ones that set the state and changes it.

-   For a component to use a store, you need to make that store an observer,
    so it can observe the observables variables and rerender according to their
    change, and you need to inject a string that is the name(key) of the store
    in the stores object that is provided to the application in the
    index file(RealIndex.tsx).

-   **What happens is that in the start of the application, one instance of
    each store is created and saved in the stores object
    (in the index file of the Logic folder).
    Keys of the stores object is the name of the store- Common/SotreNames.ts.
    Then that object is provided to the Provider component of mobx as a prop
    and this Provider component wraps our entire application so we can inject
    a store from that object using the inject function from
    mobx(happens inside RealIndex.tsx)**.

-   After you inject a store to an observer component you get the reference
    of the instance of the store as a prop and can call its functions of get
    and set(actions and computed).

-   There are examples of the usage all over the containers components.

-   **Always try to seprate your code to containers and components so it will
    be that the components in the Components folder will be stateless
    components(stupid components) and the containers will (contain) be composed
    of the state and the stateless components**.

-   There are more functions, besides @action and @computed that you can use
    if you see their usage appropriate, see the mobx docs for more information.
