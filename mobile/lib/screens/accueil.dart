import 'package:fluterproject/model/club.dart';
import 'package:fluterproject/model/matches.dart';
import 'package:fluterproject/model/news.dart';
import 'package:fluterproject/service/api_service.dart';
import 'package:fluterproject/widgets/club_info.dart';
import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:fluterproject/widgets/video_banner.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:table_calendar/table_calendar.dart';

class AccueilScreen extends StatefulWidget {
  const AccueilScreen({super.key});

  @override
  _AccueilScreenState createState() => _AccueilScreenState();
}

class _AccueilScreenState extends State<AccueilScreen> {
  List<News> news = []; // Définition des news en tant qu'attribut de la classe
  bool isLoading = true; // Variable d'état pour le chargement
  Club? club;
  List<Matches> matches = [];

  @override
  void initState() {
    super.initState();
    displaydatas();
    fetchHistory();
    fetchMatches();
    fetchNews();
  }

  Future<void> displaydatas() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token != null) {
      print('Token récupéré : $token');
    } else {
      print('Aucun token trouvé');
    }
  }

  Future<void> fetchNews() async {
    try {
      final response = await ApiService.getNews();
      setState(() {
        news = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        news = [];
        isLoading = false;
      });
    }
  }

  Future<void> fetchHistory() async {
    final response = await ApiService.getClub();
    if(club != null){
      club = response;  
      isLoading = false;
    }else{
      club = null;
      isLoading = false;
    }
    print(club);
  }

  Future<void> fetchMatches() async {
    try {
      final response = await ApiService.getPreviousMatches();
      matches = response;
      isLoading = false;
    } catch (e) {
      matches = [];
      isLoading = false;
    }
    print(matches);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            VideoBanner(
              videoPath: "assets/videos/presentation.mp4",
              navbarHeight: 100,
            ),
            if (club != null)
              ClubInfo(
                history:
                    club!
                        .history, // On utilise club! car il ne peut pas être null ici
                description: club!.description,
              ),
            TableCalendar(
              locale: 'fr_FR',
              firstDay: DateTime.utc(2010, 10, 16),
              lastDay: DateTime.utc(2030, 3, 14),
              focusedDay: DateTime.now(),
              availableGestures: AvailableGestures.none,
            ),
            Container(
              height: 500,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      top: 16.0,
                      left: 8.0,
                      right: 8.0,
                    ),
                    child: Center(
                      child: Text(
                        'Actualité du club',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  Expanded(
                    child:
                        isLoading
                            ? Center(child: CircularProgressIndicator())
                            : Expanded(
                              child: ListView.builder(
                                itemCount: news.length,
                                itemBuilder: (context, index) {
                                  var newsItem = news[index];
                                  return Card(
                                    margin: EdgeInsets.all(8),
                                    child: ListTile(
                                      title: Text(newsItem.title),
                                      subtitle: Text(newsItem.resume),
                                      onTap: () {
                                        Navigator.pushNamed(
                                          context,
                                          '/news/${newsItem.id}',
                                        );
                                      },
                                    ),
                                  );
                                },
                              ),
                            ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
