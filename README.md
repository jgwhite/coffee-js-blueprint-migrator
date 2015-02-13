# Coffee-js-blueprint-migrator

A giant hack to allow switching between coffeescript and javascript blueprints.

## Usage

To make a particular blueprint migration-capable, generate a migration blueprint for it:

```
$ ember g migration-blueprint controller
```

Now you can generate the coffeescript blueprint as follows:

```
$ ember g controller foo
```

And the javascript version like this:

```
$ ember g controller foo --javascript
```
