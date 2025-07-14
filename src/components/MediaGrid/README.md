# MediaGrid Component

A responsive React Native component that displays a grid of uploaded images and videos in a customizable column layout.

## Features

- **Responsive Design**: Automatically adjusts to screen width
- **3-Column Layout**: Default 3-column grid with customizable columns
- **Image & Video Support**: Handles both images and videos with proper thumbnails
- **Modern UI**: Clean, modern design with shadows and rounded corners
- **Remove Functionality**: Optional remove button for each item
- **Customizable**: Configurable spacing, padding, and maximum items
- **TypeScript Support**: Fully typed with TypeScript

## Usage

```tsx
import MediaGrid from '@/src/components/MediaGrid';

// Basic usage
<MediaGrid 
  assets={selectedAssets}
  onRemoveAsset={handleRemoveAsset}
/>

// Custom configuration
<MediaGrid 
  assets={selectedAssets}
  onRemoveAsset={handleRemoveAsset}
  maxItems={12}
  columns={4}
  spacing={12}
  padding={16}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `assets` | `MediaAsset[]` | Required | Array of media assets to display |
| `onRemoveAsset` | `(asset: MediaAsset) => void` | Optional | Callback when remove button is pressed |
| `maxItems` | `number` | `9` | Maximum number of items to display |
| `columns` | `number` | `3` | Number of columns in the grid |
| `spacing` | `number` | `8` | Spacing between grid items |
| `padding` | `number` | `20` | Horizontal padding around the grid |

## MediaAsset Interface

```tsx
interface MediaAsset extends ImagePicker.ImagePickerAsset {
  type?: 'image' | 'video';
}
```

## Styling

The component uses a modern design with:
- Rounded corners (12px border radius)
- Subtle shadows for depth
- Semi-transparent overlays for video play buttons
- Clean typography for file names and types
- Responsive sizing based on screen width

## Responsive Behavior

- Automatically calculates item width based on screen width
- Maintains aspect ratio (1.2:1) for consistent appearance
- Adjusts spacing and padding proportionally
- Works across different screen sizes and orientations 