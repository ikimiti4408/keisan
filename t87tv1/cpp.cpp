#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;

/*
double a_end = 0.0, b_end = 0.0;
vector<pair<int, double>> v_a = {
    {20, 1.0 / 6},
    {10, 1.0 / 3},
    {5, 1.0 / 3},
    {1, 1.0 / 6},
};
vector<pair<int, double>> v_b = {
    {1, 6.0 / 10},
    {0, 3.0 / 10},
    {-1, 1.0 / 10},
};
ll cnt = 0;
// turn 0:抽選A 1:抽選B
void dfs(int turn, int a, int b, double p) {
  cnt++;
  if (a >= 100) {
    a_end += p;
    return;
  }
  if (b >= 5) {
    b_end += p;
    return;
  }
  if (turn == 0) {
    for (int i = 0; i < 4; i++) {
      int new_a = a + v_a[i].first;
      int new_b = b;
      double new_p = p * v_a[i].second;
      dfs(1, new_a, new_b, new_p);
    }
  }
  if (turn == 1) {
    for (int i = 0; i < 3; i++) {
      int new_a = a;
      int new_b = max(b + v_b[i].first,0);
      double new_p = p * v_b[i].second;
      dfs(0, new_a, new_b, new_p);
    }
  }
}
*/

int main(void) {
  int A, B, x;
  cin >> A >> B >> x;
  
  // dfs(0,A,B,1.0);
  // cout << "";
  
  
  vector<int> v_a = {20, 10, 10, 5, 5, -1};
  vector<int> v_b = {1, 1, 1, 1, 1, 1, 0, 0, 0, -1};
  v_a[5] = x;
  srand(time(0));
  ull a_cnt = 0, b_cnt = 0;
  chrono::system_clock::time_point s, e;
  s = chrono::system_clock::now();
  while (true) {
    int a = A, b = B, turn = 0;
    while (a != 100 && b != 5) {
      if (turn == 0) a += v_a[rand() % 6];
      else b += v_b[rand() % 10];
      if (b < 0) b = 0;
      turn = !turn;
    }
    if (a >= 100) a_cnt++;
    else b_cnt++;
    e = chrono::system_clock::now();
    double t = chrono::duration_cast<std::chrono::milliseconds>(e - s).count();
    if (t - 1000 >= 0) break;
  }
  double p_a = 100.0 * (double)a_cnt / (a_cnt + b_cnt);
  cout << "精度：" << a_cnt + b_cnt << endl;
  cout << "A:" << p_a << " B:" << 100 - p_a << endl;
  
}