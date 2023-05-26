// 1.If the component doesn't have children's props, use the self-closing tag--------------------
return <Component></Component>;
//***Use This:
return <Component />;
//2.Don't write functions inside jsx elements.--------------------
return (
    <div>
    <button
      onClick={() => {
          setCount(1);
          // ...
        }}
        >
      Click
    </button>
  </div>
);
//***Use This:
const onClick = useCallback(() => {
    setCount(1);
    // ...
}, [deps]);

return (
  <div>
    <button onClick={onClick}>Click</button>
  </div>
);
//3.Use object state if you have to update multiple states together.--------------------
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const onClick = () => {
  setTimeout(() => {
      setName("John");
      setCount(count + 1);
    }, 1000);
};
//***Use This:
const [state, setState] = useState({
    count: 0,
    name: "",
});
const onClick = () => {
    setTimeout(() => {
        setState((prevState) => ({
            ...prevState,
      name: "John",
      count: prevState.count + 1,
    }));
  }, 1000);
};
//4.Use styled-components to style your components.--------------------
return <div style={{ backgroundColor: "red" }}></div>;
//***Use This:
const Container = styled.div`
background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  `;
//***Better:
const getPrimaryColor = ({ theme }) => theme.colors.primary;
const getDefaultColor = ({ theme }) => theme.colors.secondary;
const Button = styled.button`
background-color: ${getPrimaryColor};
color: ${getDefaultColor};
`;
//5.Try to avoid class-based components and use functional components instead.--------------------
//6.React.memo to avoid unnecessary re-renders.--------------------
return (
    <div>
    {items.map((item) => (
        <Component>{item}</Component>
        ))}
  </div>
);
//***Use This:
const MemoComponent = React.memo(Component);
return (
  <div>
    {items.map((item) => (
      <MemoComponent>{item}</MemoComponent>
      ))}
  </div>
);
//or
import { memo } from 'react';
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
export default memo(UserList);
//7.Use JSX ShortHand--------------------
return <button disabled={true}>Submit</button>;
//***Use This:
return <button disabled>Submit</button>;
//8.Use ternary operator instead of if-else statement.--------------------
if (isLoading) {
    return <div>Loading...</div>;
} else {
    return <div>Data</div>;
}
//***Use This:
return isLoading ? <div>Loading...</div> : <div>Data</div>;
//9.Use object(Map) instead of switch statement--------------------
switch (props.type) {
    case "ADMIN":
    return <Admin />;
    case "USER":
    return <User />;
  default:
      return <NotFound />;
    }
//***Use This:
const componentMap = {
    ADMIN: Admin,
    USER: User
};

const Component = componentMap[props.type] ?? NotFound;
return <Component />;
//***Better:
const NotFound = React.lazy(() => import("../components/NotFound"));
const componentMap = {
    ADMIN: React.lazy(() => import("../components/Admin")),
    USER: React.lazy(() => import("../components/User")),
};

const Component = componentMap[props.type] ?? NotFound;
return <Component />;
//10.Use object destructuring instead of passing multiple props--------------------
const { name, age, role } = props;
return (
    <>
    <Component name={name} age={age} role={role} />
  </>
);
//***Use This:
return (
    <>
    <Component {...props} />
  </>
);
//11.Don't need curly braces when you won't pass the string to a component.--------------------
return <Component name={"John"} />;
//***Use This:
return <Component name="John" />;
//12.Don't use react element props like className, style etc for component custom props.--------------------
return (
  <Component style="bordered"/>
);
//***Use This:
return (
    <Component variant="bordered"/>
    );
//13.Use fragment instead of html element like div, span, etc.--------------------
    return (
        <div>
    <span>{props.name}</span>
    <span>{props.age}</span>
  </div>
);
//***Use This:
return (
    <>
    <span>{props.name}</span>
    <span>{props.age}</span>
  </>
);
//14.Don't use else block if if block returns something--------------------
if (props.name) {
  return <div>{props.name}</div>;
} else {
    return <div>No name</div>;
}
//***Use This:
if (props.name) {
    return <div>{props.name}</div>;
}
return <div>No name</div>;
//15.Use React.fragment instead of Html element like div, span, etc when you won't use the key property.--------------------
return (
    <container>
    {list.map((item) => (
        <div key={item.id}>
        <SomeComponent />
        <SomeAnotherComponent />
      </div>
    ))}
  </container>
);
//***Use This:
return (
    <>
    {list.map((item) => (
        <React.Fragment key={item.id}>
        <SomeComponent />
        <SomeAnotherComponent />
      </React.Fragment>
    ))}
  </>
);
//16.Store Tokens to an HTTP Cookie rather than localStorage--------------------
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = token;
}
//***Use This:
import Cookies from "js-cookie"; //  use another library if you want

const token = Cookies.get("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
//17.Use interceptors for auth token or any other common headers--------------------
axios.get("/api", {
    headers: {
        ts: new Date().getTime(),
    },
});
//***Use This:
// only once
axios.interceptors.request.use(
    (config) => {
        // Do something before request is sent
    config.headers["ts"] = new Date().getTime();
    return config;
  },
  (error) => {
      // Do something with request error
    return Promise.reject(error);
}
);
// Component
axios.get("/api");
//18.Use context/redux for passing props to children--------------------
const auth = { name: "John", age: 30 };
return (
  <Router>
    <Route path="/" element={<App auth={auth} />} />
    <Route path="/home" element={<Home auth={auth} />} />
  </Router>
);
//***Use This:
return (
    <Provider store={store}>
    <Router>
      <Route
        path="/"
        element={<App />}
        />
      <Route
        path="/home"
        element={<Home />}
      />
    </Router>
    </Provider>
);
// Inside child component
const { auth } = useContext(AuthContext); // For context
const { auth } = useSelector((state) => state.auth); // For redux
//19.Use helper function for styled-components.--------------------
const Button = styled.button`
  margin: 1.31rem 1.43rem;
  padding: 1.25rem 1.5rem;
`;
//***Use This:
const toRem = (value) => `${value / 16}rem`;
const Button = styled.button`
margin: ${toRem(21)} ${toRem(23)};
  padding: ${toRem(20)} ${toRem(24)};
`;
//20.Use common function for input data change--------------------
const onNameChange = (e) => setName(e.target.value);
const onEmailChange = (e) => setEmail(e.target.value);
return (
    <form>
    <input type="text" name="name" onChange={onNameChange} />
    <input type="text" name="email" onChange={onEmailChange} />
  </form>
);
//***Use This:
const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

return (
  <form>
    <input type="text" name="name" onChange={onInputChange} />
    <input type="text" name="email" onChange={onInputChange} />
  </form>
);
//21.Use HOC for authentication and private route--------------------
const Component = () => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return <div></div>;
};
//***Use This:
const withAuth = (Component) => {
    return (props) => {
        if (!isAuthenticated()) {
            return <Redirect to="/login" />;
    }
    return <Component {...props} />;
};
};
// Route
<Route path="/home" component={withAuth(Home)} />;
// Component
const Component = (props) => <div></div>;
export default withAuth(Component);
//22.Use Array of route object to define the routes--------------------
return (
    <Router>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="/topics" element={<Topics />} />
  </Router>
);
//***Use This:
const routes = [
  {
    path: "/",
    role: ["ADMIN"],
    element: React.lazy(() => import("../pages/App")),
    children: [
      {
        path: "/child",
        element: React.lazy(() => import("../pages/Child")),
      },
    ],
  },
  {
    path: "/about",
    role: [],
    element: React.lazy(() => import("../pages/About")),
  },
  {
    path: "/topics",
    role: ["User"],
    element: React.lazy(() => import("../pages/Topics")),
  },
];
const createRoute = ({ element, children, role, ...route }) => {
  const Component = role.length > 0 ? withAuth(element) : element;
  return (
    <Route key={route.path} {...route} element={<Component />}>
      {children && children.map(createRoute)}
    </Route>
  );
};
return <Routes>{routes.map(createRoute)}</Routes>;
//23.Use Typescript.--------------------
//24.Use eslint, prettier for Formatting.--------------------
//25.Avoid Using Indexes as Key Props.--------------------