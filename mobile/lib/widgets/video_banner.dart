import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class VideoBanner extends StatefulWidget {
  const VideoBanner({
    super.key,
    required this.videoPath,
    this.navbarHeight = 100,
  });

  @override
  _VideoBannerState createState() => _VideoBannerState();

  final String videoPath;
  final double navbarHeight;
}

class _VideoBannerState extends State<VideoBanner> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset(widget.videoPath)
      ..initialize().then((_) {
        setState(() {});
        _controller.setLooping(true);
        _controller.setVolume(0);
        _controller.play();
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    final double screenWidth = MediaQuery.of(context).size.width;
    final double videoHeight = screenHeight - widget.navbarHeight;

    return SizedBox(
      height: screenHeight,
      width: screenWidth,
      child: Stack(
        children: [
          Positioned.fill(
            child: ClipRect(
              // Découpe la vidéo
              child: Align(
                alignment: Alignment.center,
                widthFactor: 9 / 16, // Garde seulement la partie centrale
                child: SizedBox(
                  width: screenWidth, // Garde la largeur complète
                  height: screenHeight, // Garde la hauteur complète
                  child: FittedBox(
                    fit:
                        BoxFit
                            .cover, // Zoom pour couvrir l'écran et cropper les bords
                    child: SizedBox(
                      width:
                          screenHeight *
                          (16 / 9), // Taille originale pour FittedBox
                      height: screenHeight,
                      child: VideoPlayer(_controller),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned.fill(
            top: -100,
            left: 0,
            right: 0,
            bottom: 0,
            child: Center(
              child: Container(
                width: screenWidth * 0.8,
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "Bienvenue sur notre site",
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 16),
                    Text(
                      "Découvrez notre contenu passionnant !",
                      style: TextStyle(fontSize: 18),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
