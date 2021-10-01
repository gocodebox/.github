Setup Matrix Action
===================

GitHub workflow action designed to allow custom YAML configurations for a specified workflow's job matrix.

---

## Usage

Supply a custom `workflow-matrix.yml` file in the repository's `.github` directory. The contents of this file should contain one or more [job matrix configurations](https://docs.github.com/en/github-ae@latest/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix), keyed by the workflow's name. 

For example, to customize the matrix for the `test-phpunit.yml` workflow, the `workflow-matrix.yml` file might look like the following example:


```yaml
Test PHPUnit:
  merge: append
  WP:
    - "5.2"
  PHP:
    - "5.6"

other-workflow:
  key:
  	- val
  	- val2
```

The action will look for a default and a custom matrix configuration for the current workflow (as defined by GitHub contexts).

Default configurations are defined in [defaults.yml](./src/defaults.yml).

If no default configuration is found there's no reason to use this action.

If no custom configuration is found, it will merge (or replace) the default configuration based on the supplied `merge` key:


## Merge Strategies

| Merge Type | Default | Description |
| ---------- | ------- | ----------- |
| append     | Yes     | Appends values of the specified keys to those in the default configuration. Keys not specified in the default are created. |
| replace    | No      | Replaces all values in the default configuration with the values specified in the custom config. Keys that are not specified are left untouched. An empty array can be provided to empty the default array. |
| full       | No      | Use the custom configuration in it's entirety in place of the default configuration. |


### Example: `append`

Default config:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
```

Custom workflow-matrix.yml:

```yaml
Test PHPUnit:
  merge: append # Optional (append is the default value).
  WP:
    - "5.6"
  PHP:
    - "7.3"
  CUSTOM:
    - "custom value"
  include:
    - PHP: "8.1"
      WP: "5.8"
```

Generated matrix:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
    - "5.6"
  PHP:
    - "8.0"
    - "7.4"
    - "7.3"
  CUSTOM:
    - "custom value"
  include:
    - PHP: "8.1"
      WP: "5.9"
    - PHP: "8.1"
      WP: "5.8"
```


### Example: `replace`

Default config:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
```

Custom workflow-matrix.yml:

```yaml
Test PHPUnit:
  merge: replace
  WP:
    - "5.6"
  CUSTOM:
    - "custom value"
  include: [] # Removes all items from the array.
```

Generated matrix:

```yaml
Test PHPUnit:
  WP:
    - "5.6"
  PHP:
    - "8.0"
    - "7.4"
  CUSTOM:
    - "custom value"
  include:
```



### Example: `full`

Default config:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
```

Custom workflow-matrix.yml:

```yaml
Test PHPUnit:
  merge: full
  WP:
    - "5.6"
  CUSTOM:
    - "custom value"
```

Generated matrix:

```yaml
Test PHPUnit:
  WP:
    - "5.6"
  CUSTOM:
    - "custom value"
```

## Delete specific values

When overriding a default config, it might prove useful to delete a specific value from an array of the default config. This can be accomplished by specifying an array of array notation strings via the `__delete` key for a given workflow configuration.

For example, if we wish to remove WP 5.8 and remove the second object from the `include` array in the following default config:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
    - PHP: "8.1"
      WP: "5.8"
```

Custom workflow-matrix.yml:

```yaml
Test PHPUnit:
  __delete:
  	- WP[0]
    - include[1]
```

Generated matrix:


```yaml
Test PHPUnit:
  WP:
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
```

Value deletion *may* be combined with a merge in order to remove specified values and perform merges on the same default configuration. In this scenario the deletion will be performed on the default config and then the merge operation will be performed.

Default config:

```yaml
Test PHPUnit:
  WP:
    - "5.8"
    - "5.7"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
    - PHP: "8.1"
      WP: "5.8"
```

Custom workflow-matrix.yml:

```yaml
Test PHPUnit:
  merge: append
  WP:
  	- "5.6"
  __delete:
    - include[1]
```

Generated matrix:


```yaml
Test PHPUnit:
  WP:
    - "5.7"
    - "5.6"
  PHP:
    - "8.0"
    - "7.4"
  include:
    - PHP: "8.1"
      WP: "5.9"
```