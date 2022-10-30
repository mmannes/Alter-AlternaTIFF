# Alter-AlternaTIFF

Display multi-page TIFF documents with propper pagination embeded in the browser using an `iframe`.

No dependencies to your project. No Node.js. No install. No includes.

It uses the [Tiff.js](https://github.com/seikichi/tiff.js) webassembly port of the LibTIFF to place TIFF pages inside an `<canvas>` HTML element.

The aim of this repository is to clone the behaviour of the Firefox's PDF viewer. Today it has the minimum functionalities that I need, like pagination, zoom and a download button.

## Example

Simply clone this repository inside your project and display TIFF like in the example bellow:

```html
<iframe
    name="./multipage_tif_example.tif"
    style="width: 100%; height: 540px"
    src="./"
>
</iframe>
```

Display multi-page TIFF documents with propper pagination embeded in the browser using an `iframe`.

No dependencies to your project. No Node.js. No install. No includes.

It uses the [Tiff.js](https://github.com/seikichi/tiff.js) webassembly port of the LibTIFF to place TIFF pages inside an `<canvas>` HTML element.

The aim of this repository is to clone the behaviour of the Firefox's PDF viewer. Today it has the minimum functionalities that I need, like pagination, zoom and a download button.

## Example

Simply clone this repository inside your project and display TIFF like in the example bellow:

```html
<iframe
    name="./multipage_tif_example.tif"
    style="width: 100%; height: 540px"
    src="./"
>
</iframe>
```

As showed, the `name` attribute is where the path to the TIFF image goes. The `src` attribute points to the cloned Alter-AlternaTIFF repository.
