import 'dart:developer';

import 'package:fluterproject/model/news.dart';
import 'package:fluterproject/service/api_service.dart';
// import 'package:fluterproject/widgets/actualities.dart';
import 'package:flutter/material.dart';

class ActualitiesScreen extends StatefulWidget {
  const ActualitiesScreen({super.key});

  @override
  State<ActualitiesScreen> createState() => _ActualitiesScreenState();
}

class _ActualitiesScreenState extends State<ActualitiesScreen> {
  List<News> news = []; // Définition des news en tant qu'attribut de la classe
  bool isLoading = true;

  Future<void> fetchNews() async {
    try {
      final response = await ApiService.getNews();
      setState(() {
        news = response;
        inspect(news);
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        news = [];
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();

    fetchNews();
  }

  @override
  Widget build(BuildContext context) {
    // inspect(news);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 189, 208, 239),
        title: Text('Bienvenue sur l\'Application Sportive'),
        centerTitle: true,
      ),
      body: Expanded(
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
                  Navigator.pushNamed(context, '/news/${newsItem.id}');
                },
              ),
            );
          },
        ),
      ),
      // body: Text('data'),
    );
  }
}
