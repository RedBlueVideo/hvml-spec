# DEVNOTES

## Node-gyp failure

Trying to find suitable Node version to use; both latest and v15.0.0 incur `node-gyp` failure during `npm install`:

> ModuleNotFoundError: No module named 'distutils'

`distutils` is a Python package that comes included by default in v2, but was removed in v3.

I have both Python v2 and v3 installed. Even though the default system Python v2, and I’ve confirmed that `distutils` is installed in that environment, `node-gyp` is still failing to compile due to that library being missing.

Can change version with:

```
npm install --python="/path/to/python_executable"
```

After changing to 2.7, new error(s):

> AttributeError: 'NoneType' object has no attribute 'groupdict'

Reinstalled Xcode Tools:

```
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

Still errors:

> error: no member named 'Handle' in namespace 'v8'

[Google](https://share.google/aimode/TSmmAnIRqrvmqcoR9):

> This error occurs because the version of sharp you are using is incompatible with your version of Node.js. Specifically, Node.js 12+ updated its V8 engine and removed the deprecated v8::Handle API, which older versions of sharp (v0.21.3 and below) still require for compilation.

After moving to 11.15.0:

> error There was a problem loading the local develop command. Gatsby may not be installed. Perhaps you need to run "npm install"?
> 
> 
>   Error: evalmachine.<anonymous>:1
>   Object.getOwnPropertyNames(globalThis)
>                              ^
>   ReferenceError: globalThis is not defined

### Aborting, attempting fresh install with newer Gatsy version and moving files

- Latest Gatsby (v5) has too many design changes since v1, may want to try v2 first
- Need to verify that all tools/templates in the process are the v2 versions, so that means installing gatsby-cli@2.0.0 and using the old `gatsby-starter-blog` template

Did `npm install -g gatsby-cli@2.0.0-rc.6`, which scopes to current NVM version. Not bothering to switch to an old Node at this time.
```
which gatsby
/Users/hughguiney/.nvm/versions/node/v25.2.1/bin/gatsby
```

