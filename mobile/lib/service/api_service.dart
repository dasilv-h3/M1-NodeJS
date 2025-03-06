import 'dart:convert';
import 'package:fluterproject/model/club.dart';
import 'package:fluterproject/service/api_config.dart';
import 'package:fluterproject/model/news.dart';

class ApiService {
  // Méthode pour récupérer les news
  static Future<List<News>> getNews() async {
    final client = ApiConfig.createClient();
    final url = Uri.parse('${ApiConfig.baseUrl}news');

    try {
      final response = await client.get(
        url,
        headers: ApiConfig.getHeaders(),
      );

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
}
