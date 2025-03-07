import 'package:fluterproject/model/sponsors.dart';
import 'package:fluterproject/service/api_config.dart';
import 'package:fluterproject/service/api_service.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SponsorsWidget extends StatefulWidget {
  @override
  _SponsorsWidgetState createState() => _SponsorsWidgetState();
}

class _SponsorsWidgetState extends State<SponsorsWidget> {
  late Future<List<Sponsor>> _sponsorsFuture;

  @override
  void initState() {
    super.initState();
    _sponsorsFuture = ApiService.getSponsors(); // Appel API
  }

  /// Ouvre l'URL du sponsor dans un navigateur
  void _launchURL(String url) async {
    final Uri uri = Uri.tryParse(url) ?? Uri();
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Impossible d\'ouvrir le lien')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Sponsor>>(
      future: _sponsorsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Erreur : ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('Aucun sponsor disponible'));
        }

        List<Sponsor> sponsors = snapshot.data!;

        return SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text(
                    'Nos Partenaires',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(height: 20),
                GridView.builder(
                  shrinkWrap: true, // Important pour éviter le débordement
                  physics:
                      NeverScrollableScrollPhysics(), // Empêche le scroll interne
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    childAspectRatio: 1,
                  ),
                  itemCount: sponsors.length,
                  itemBuilder: (context, index) {
                    final sponsor = sponsors[index];
                    return GestureDetector(
                      onTap: () => _launchURL(sponsor.url),
                      child: Card(
                        elevation: 3,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Padding(
                          padding: EdgeInsets.all(8),
                          child: Image.network(
                            '${sponsor.logo}',
                            fit: BoxFit.contain,
                            errorBuilder:
                                (context, error, stackTrace) =>
                                    Icon(Icons.broken_image, size: 50),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
