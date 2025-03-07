import 'dart:convert';
import 'package:fluterproject/model/club.dart';
import 'package:fluterproject/model/sponsors.dart';
import 'package:fluterproject/service/api_config.dart';
import 'package:fluterproject/model/news.dart';

class ApiService {
  // Méthode pour récupérer les news
  static Future<List<News>> getNews() async {
    final client = ApiConfig.createClient();
    final url = Uri.parse('${ApiConfig.baseUrl}news');

    try {
      final response = await client.get(url, headers: ApiConfig.getHeaders());

      if (response.statusCode == 200) {
        // Si la requête réussit, on parse les données
        List<dynamic> responseBody = json.decode(response.body);
        return responseBody.map((json) => News.fromJson(json)).toList();
      } else {
        throw Exception('Erreur lors de la récupération des news');
      }
    } finally {
      client.close(); // Toujours fermer le client HTTP
    }
  }

  // Méthode pour créer les news
  static Future<bool> createNews(News news) async {
    final client = ApiConfig.createClient();
    final url = Uri.parse('${ApiConfig.baseUrl}news');

    try {
      final response = await client.post(
        url,
        headers: ApiConfig.getHeaders(),
        body: json.encode(news.toJson()), // Convertir l'objet en JSON
      );

      if (response.statusCode == 201) {
        return true; // Succès
      } else {
        throw Exception('Erreur lors de la création de la news');
      }
    } finally {
      client.close();
    }
  }

  // Méthode pour récupérer les infos du club
  static Future<Club> getClub() async {
    final client = ApiConfig.createClient();
    final url = Uri.parse('${ApiConfig.baseUrl}club');
    final response = await client.get(
      url,
      headers:
          ApiConfig.getHeaders(), // Utilisation de la config pour les en-têtes
    );
    var responseBody = json.decode(response.body);
    print(responseBody);
    try {
      if (response.statusCode == 200) {
        // Si la requête réussit, on parse les données
        var responseBody = json.decode(response.body);
        print(response);
        return Club.fromJson(responseBody);
      } else {
        throw Exception('Erreur lors de la récupération des infos du club');
      }
    } finally {
      client.close(); // Toujours fermer le client HTTP
    }
  }

  // Méthode pour récupérer les news
  static Future<List<Sponsor>> getSponsors() async {
    final client = ApiConfig.createClient();
    final url = Uri.parse('${ApiConfig.baseUrl}sponsors');

    try {
      final response = await client.get(url, headers: ApiConfig.getHeaders());

      if (response.statusCode == 200) {
        // Si la requête réussit, on parse les données
        List<dynamic> responseBody = json.decode(response.body);
        return responseBody.map((json) => Sponsor.fromJson(json)).toList();
      } else {
        throw Exception('Erreur lors de la récupération des sponsors');
      }
    } catch (e) {
      throw Exception('Échec de la requête : ${e.toString()}');
    } finally {
      client.close(); // Toujours fermer le client HTTP
    }
  }
}
