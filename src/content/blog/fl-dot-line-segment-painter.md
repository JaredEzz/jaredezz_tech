---
author: JaredEzz
pubDatetime: 2024-01-09T12:49:00.000Z
title: Custom FlDotLineSegmentPainter for Prototyping
postSlug: fl-dot-line-segment-painter
featured: false
draft: false
tags:
  - flutter
  - prototyping
  - custom-widgets
  - fl_chart
  - web-development
  - ui-design
  - software-engineering
  - dev
description: This post explores the process of creating a custom FlDotPainter in Flutter to match a specific design requirement, demonstrating the flexibility of Flutter's widget system.
---

## Introduction
In the early stages of our company, rapid feature prototyping is part of my daily routine. Thanks to Flutter's rich set of widgets and the vast selection of third-party packages on [pub.dev](https://pub.dev/), I can turn around new prototypes in just a few hours. 

Here's the latest challenge I faced: a component mockup in an email from our product manager, showing a graph that needed a custom touch.


![Component Mockup](/assets/graph-mockup.jpeg)

## Problem
The [fl_chart package](https://pub.dev/packages/fl_chart) offers a LineChart widget that seemed ideal for our needs. However, it only includes these FlDotPainters by default:

1. FlDotCirclePainter
2. FlDotDiamondPainter
3. FlDotRectanglePainter

None of these matched the design I was given, and my attempts to customize them fell short, especially when trying to create line segments perpendicular to the chart line.

## Solution
Flutter's pixel-perfect control came to the rescue. With solid documentation from the fl_chart developers and a bit of AI assistance, I crafted a custom FlDotPainter called FlDotLineSegmentPainter and used the custom paint method for the text labels.

Here's the code gist for the custom painter:


[GitHub Gist](https://gist.github.com/JaredEzz/d3854695ca1acb0df3c44785073fc248)

```dart
/// This class is an implementation of a [FlDotPainter] that draws
/// a line segment with a value label above it.
class FlDotLineSegmentPainter extends FlDotPainter {
  /// Constructs a [FlDotLineSegmentPainter].
  FlDotLineSegmentPainter({
    required this.width,
    required this.height,
    required this.value,
    required this.textColor,
    this.color = Colors.blue,
    this.showText = true,
  });

  /// The color of the line segment.
  final Color color;

  /// The width of the line segment.
  final double width;

  /// The height of the line segment.
  final double height;

  /// The numerical value to display above the line segment.
  final double value;

  /// The color of the text displaying the value.
  final Color textColor;

  /// Whether to show the text label.
  final bool showText;

  /// Draws the line segment and the value label on the canvas.
  @override
  void draw(Canvas canvas, FlSpot spot, Offset offsetInCanvas) {
    // Draw the line segment
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = width;
    canvas.drawLine(
      Offset(offsetInCanvas.dx, offsetInCanvas.dy - height / 2),
      Offset(offsetInCanvas.dx, offsetInCanvas.dy + height / 2),
      paint,
    );

    // Draw the value label
    if (showText) {
      final textSpan = TextSpan(
        text: value.toStringAsFixed(1),
        style: TextStyle(color: textColor),
      );
      final textPainter = TextPainter(
        text: textSpan,
        textDirection: TextDirection.ltr,
      )..layout();
      textPainter.paint(
        canvas,
        Offset(
          offsetInCanvas.dx - textPainter.width / 2,
          offsetInCanvas.dy - height / 2 - textPainter.height - 5,
        ),
      );
    }
  }

  /// Returns the size of the painter area.
  @override
  Size getSize(FlSpot spot) {
    return Size(width, height);
  }

  /// Properties used for the equality check.
  @override
  List<Object?> get props => [color, width, height, value, textColor];

  /// Interpolates between two [FlDotLineSegmentPainter]s.
  @override
  FlDotPainter lerp(FlDotPainter a, FlDotPainter b, double t) {
    if (a is FlDotLineSegmentPainter && b is FlDotLineSegmentPainter) {
      return FlDotLineSegmentPainter(
        width: lerpDouble(a.width, b.width, t)!,
        height: lerpDouble(a.height, b.height, t)!,
        color: Color.lerp(a.color, b.color, t)!,
        value: lerpDouble(a.value, b.value, t)!,
        textColor: Color.lerp(a.textColor, b.textColor, t)!,
      );
    } else {
      throw Exception(
        'Cannot interpolate between different types of FlDotPainters',);
    }
  }

  /// The main color of the dot painter.
  @override
  Color get mainColor => color;
}
```

## Conclusion
The result was a custom FlDotPainter that perfectly matched the proposed design, and the prototype received positive feedback from the team. This experience reaffirmed the ease of extending Flutter's capabilities, when provided solutions just don't fit your use case.

![Resulting Graph with Custom Line Painter](/assets/custom-line-painter.png)

I've also submitted a [pull request]() to the fl_chart package, so this painter might be included in a future release. 
