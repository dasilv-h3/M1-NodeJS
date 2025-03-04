import 'dart:convert';
import 'dart:developer';
import 'package:fluterproject/model/user.dart';
import 'package:http/http.dart' as http;

class UserApiService {
  Future<List<User>> getUsers() async {
    Uri url = Uri.parse('http://10.0.2.2:3000/api/users');
    http.Response response = await http.get(url);

    if (response.statusCode == 200) {
      List<dynamic> users = jsonDecode(response.body);
      // inspect(users);
      return users.map((data) => User.fromJSON(data)).toList();
    } else {
      throw Error();
    }
  }
}
