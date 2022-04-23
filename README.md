This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Integration with Backend (Request)

#### Library lib
Wrapper to handle all relate to the integration with backend or api rest request

```
import {useUser} from 'lib';
const {user} = useUser(); // get the current user information (auth user model)
const {updateCache} = useUser(); // update the current user information (auth user model)
const {hasPermission} = useUser(); // check the if the user have a specify permission(s)
```
```
import {useAuth} from 'lib';
const {reload} = useAuth();
```

```
import {RouterLoader} from 'lib';
<RouterLoader routes={[...routes]} notfoundRedirect={'/'}/>
```

## Base Components

#### `blueprintjs`
Base library for the user interface components. It is optimized for building complex data-dense interfaces for desktop applications.

https://blueprintjs.com/docs/

### Forms
#### formik
Takes care of the repetitive and annoying stuff--keeping track of values/errors/visited fields, orchestrating validation, and handling submission.
```
import {useFormik} from 'formik';

const formik = useFormik({
        initialValues: {
            _id: Date.now(),
            name: '',
            identifier: '',
            password: '',
        },
        validate, // d-validations associate
        onSubmit: handleSubmit
    });

<form onSubmit={formik.handleSubmit}>
    ...components
    <Input
        name="name"
        id="name"
        label={'Lorems ...'}
        placeholder={'Lorems ...'}
        required={true/false}
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
    />
    ...
    <Button type={'submit'}>Lorems ...</Button>
</form>

```

#### lib/validations
used with formik to handle the validations
```
import validation, {isEmail, isName, isPassword, isRequired} from "lib/validations";

const validate = validation({
    name: [isName, isRequired],
    identifier: [isEmail, isRequired],
    password: [isPassword, isRequired],
});
```
