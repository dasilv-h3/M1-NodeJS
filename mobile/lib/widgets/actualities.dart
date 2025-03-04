import 'package:fluterproject/model/user.dart';
import 'package:fluterproject/service/user_api.dart';
import 'package:flutter/material.dart';

class Actualities extends StatelessWidget {
  const Actualities({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: UserApiService().getUsers(),
      builder: (context, snapshot) {
        List<User> users = snapshot.requireData;

        if (snapshot.hasData) {
          
        } else {
          return CircularProgressIndicator();
        }

        // inspect(users);

        return SizedBox();
      },
    );
  }
}
