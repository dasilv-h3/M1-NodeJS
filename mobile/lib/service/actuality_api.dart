import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:fluterproject/model/actuality.dart';

class ActualityApiService {
  Future<List<Actuality>> getActualities() async {
    Uri url = Uri.parse('http://10.0.2.2:3000/api/news');
    http.Response response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> actualities = jsonDecode(response.body);
      return actualities.map((data) => Actuality.fromJSON(data)).toList();
    } else {
      throw Error();
    }
  }
}
