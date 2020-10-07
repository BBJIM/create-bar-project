# Folder Structure And Imports Convention In This Project

The basic project folder structure is:

-   **.storybook**: a folder created automatically from installing the storybook library - you dont really need to edit it unless you know what you want to add there like storybook addons.
-   **build**: this folder created when you make a normal react build - this is what tou will put in the production server.
-   **Docs**: md files about most of the things in this project.
-   **node_modules**: the node modules from the libraries you use, dont forget to `yarn` in the production server in the folder of the build.
-   **public**: public files like images and the index.html of the normal react.
-   **src**: containes the application code.
-   -   **Api**: the folder containing the API file/module.
-   -   **App**: the folder containing the highest level of the application. in the App file you can call 'start of the app requests' and it uses the layout and routes components, used by the index of src.
-   -   -   **Layout**: constant components that are not part of the application pages like navbar, modal, globalstyles, loading screen and more.
-   -   -   **Routes**: the normal react router that containes the routes of the application, called inside of the layout as the children.
-   -   **Common**: common files and folders like validations, models, utils, common consts, pollyfills and more.
-   -   **Components**: containes the app more small components that contain state and stateless components from the UI_KIT folder.
-   -   -   **UI_KIT**: containes stateless components that uses small singular components form the Custom folder.
-   -   -   -   **Custom**: containes small singular stateless components like Button, Inputs, Text, Headline and more.
-   -   **Containers**: the folders inside represnt the pages of the site - each route in the application will have a container component like Homepage this can use any component in the component folder.
-   -   **Fonts**: containes the fonts of the project and the font configuration of styled-components file.
-   -   **Logic**: contains the stores that represent the BL of the application and in it the global mobx state.
-   -   **stories**: the folders here represnt the stories in the storybook.
-   -   **Theme**: the global theme of styled-components you can use in the project.
-   -   **RealIndex.tsx**: file that contains the content of the original normal react index.tsx - there the application uses the Router and Theme Provider to the application calls the App component.
-   -   **index.tsx**: only calls the RealIndex file and exists only so the pollyfills imports would come first in the application.
